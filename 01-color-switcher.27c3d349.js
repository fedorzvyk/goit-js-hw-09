const t=t=>document.querySelector(t),e=t("button[data-start]"),d=t("button[data-stop]");let a=null;e.addEventListener("click",(function(){e.disabled=!0,d.disabled=!1,a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),d.addEventListener("click",(function(){e.disabled=!1,d.disabled=!0,clearInterval(a)})),d.disabled=!0;
//# sourceMappingURL=01-color-switcher.27c3d349.js.map