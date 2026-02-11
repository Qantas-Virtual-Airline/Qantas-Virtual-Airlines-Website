import { renderNavbar } from "./src/ui/navbar.js";
import { renderFooter } from "./src/ui/footer.js";

document.getElementById("navbar").innerHTML = renderNavbar();
document.getElementById("footer").innerHTML = renderFooter();
