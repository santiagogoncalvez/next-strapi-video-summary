import{b3 as p,a as d,ds as g,j as e,dt as u,d as m,cM as f,cs as h,bD as x,W as i,bE as b,bF as j,du as M,m as C,dv as y}from"./strapi-DBLEJUct.js";import{u as k}from"./useAdminRoles-DhIaM3Cg.js";const v=({children:a,target:o})=>{const{toggleNotification:n}=p(),{formatMessage:t}=d(),{copy:r}=g(),l=t({id:"app.component.CopyToClipboard.label",defaultMessage:"Copy to clipboard"}),c=async s=>{s.preventDefault(),await r(o)&&n({type:"info",message:t({id:"notification.link-copied"})})};return e.jsx(u,{endAction:e.jsx(m,{label:l,variant:"ghost",onClick:c,children:e.jsx(f,{})}),title:o,titleEllipsis:!0,subtitle:a,icon:e.jsx("span",{style:{fontSize:32},children:"✉️"}),iconBackground:"neutral100"})},w=({registrationToken:a})=>{const{formatMessage:o}=d(),n=`${window.location.origin}${h()}/auth/register?registrationToken=${a}`;return e.jsx(v,{target:n,children:o({id:"app.components.Users.MagicLink.connect",defaultMessage:"Copy and share this link to give access to this user"})})},U=({disabled:a})=>{const{isLoading:o,roles:n}=k(),{formatMessage:t}=d(),{value:r=[],onChange:l,error:c}=x("roles");return e.jsxs(i.Root,{error:c,hint:t({id:"app.components.Users.ModalCreateBody.block-title.roles.description",defaultMessage:"A user can have one or several roles"}),name:"roles",required:!0,children:[e.jsx(i.Label,{children:t({id:"app.components.Users.ModalCreateBody.block-title.roles",defaultMessage:"User's roles"})}),e.jsx(b,{disabled:a,onChange:s=>{l("roles",s)},placeholder:t({id:"app.components.Select.placeholder",defaultMessage:"Select"}),startIcon:o?e.jsx(E,{}):void 0,value:r.map(s=>s.toString()),withTags:!0,children:n.map(s=>e.jsx(j,{value:s.id.toString(),children:t({id:`global.${s.code}`,defaultMessage:s.name})},s.id))}),e.jsx(i.Error,{}),e.jsx(i.Hint,{})]})},L=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`,S=C.div`
  animation: ${L} 2s infinite linear;
`,E=()=>e.jsx(S,{children:e.jsx(M,{})});export{w as M,U as S,v as a};
