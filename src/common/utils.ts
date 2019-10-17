export function getMetaDataFromState({route, params = {}, query = {}}) {
    let title = "";
    // 'news.html' && '/news.html' is OK
    let mroute = "";
    if (route && route.length) {
        mroute = (route[0] === "/") ? route.slice(1) : route;
    }

    switch (mroute) {
    case "cv.html":
        title = "Vreshch Volodymyr - CV";
        break;
    case "interests.html":
        title = "Vreshch Volodymyr - Interests";
        break;
    case "projects.html":
        title = "Vreshch Volodymyr - Projects";
        break;
    case "contacts.html":
        title = "Vreshch Volodymyr - Contacts";
        break;
    default:
        title = "Vreshch Volodymyr Homepage";
    }

    return {
        title,
        description: "Personal homepage - Volodymyr D. Vreshch",
    };
}
