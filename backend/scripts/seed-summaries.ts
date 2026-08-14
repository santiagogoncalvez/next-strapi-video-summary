import { createStrapi } from "@strapi/strapi";
import { SUMMARIES } from "../constants/seed-summaries";

const USER_ID = process.env.SEED_USER_ID;

if (!USER_ID) {
   throw new Error("SEED_USER_ID is required");
}

async function seed() {
   const strapi = await createStrapi({
      distDir: "./dist",
   }).load();

   try {
      console.log(`🗑️ Eliminando summaries de userId: ${USER_ID}`);

      await strapi.db.query("api::summary.summary").deleteMany({
         where: {
            userId: USER_ID,
         },
      });

      console.log(`🌱 Creando ${SUMMARIES.length} summaries...`);

      for (const summary of SUMMARIES) {
          const document = await strapi
             .documents("api::summary.summary")
             .create({
                data: summary,
             });

          await strapi.documents("api::summary.summary").publish({
             documentId: document.documentId,
          });
      }

      console.log(`✅ Seed completado: ${SUMMARIES.length} summaries creados.`);
   } finally {
      await strapi.destroy();
   }
}

seed().catch((error) => {
   console.error("❌ Seed failed:", error);
   process.exit(1);
});
