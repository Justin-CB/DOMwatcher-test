var num_mutations_observed=0;
var num_animations_observed=0;
const observer = new MutationObserver(function (mutationsList, observer){num_mutations_observed++;});
observer.observe(document, { childList: true, subtree: true});
function dynamic_content_listener(event) {
    num_animations_observed++;
}

function polyfill_dynamic_content()
{
    var style=document.createElement("style");
    var sheet;
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    sheet=style.sheet;
    sheet.insertRule("@keyframes ruffleObjectOrEmbedInserted { from { opacity: 0.99; } to { opacity: 1; } }",-1);
    sheet.insertRule("object, embed { animation-duration:0.001s; animation-name: ruffleObjectOrEmbedInserted; }",-1);
    document.addEventListener("animationstart", dynamic_content_listener, false);
    document.addEventListener("MSAnimationStart", dynamic_content_listener, false);
    document.addEventListener("webkitAnimationStart", dynamic_content_listener, false);
}
function log_variables()
{
    console.log("# of mutations: "+num_mutations_observed+" | # of animations: "+num_animations_observed);
}
setInterval(log_variables,1000);