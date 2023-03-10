type ACTIONTYPE =
  | { type: "clearAnimeList" }
  | { type: "setAnimeList"; payload: { currentTVData: any; prevTVData: any } }
  | { type: "sortByScore"; payload: { currentTVData: any; prevTVData: any } }
  | {
      type: "sortByPopularity";
      payload: { currentTVData: any; prevTVData: any };
    }
  | { type: "sortByTitle"; payload: { currentTVData: any; prevTVData: any } }
  | {
      type: "sortByStartDate";
      payload: { currentTVData: any; prevTVData: any };
    }
  | { type: "sortByStudio"; payload: { currentTVData: any; prevTVData: any } };

const reducer = (state: any, action: ACTIONTYPE) => {
  let obj;
  switch (action.type) {
    case "clearAnimeList":
      return {};
    case "setAnimeList":
      return {
        currentTVData: action.payload.currentTVData,
        prevTVData: action.payload.prevTVData,
      };
    case "sortByPopularity":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          return b.members - a.members;
        }),
      };
      if (action.payload.prevTVData != null) {
        const tmp = [...action.payload.prevTVData].sort((a, b) => {
          return b.members - a.members;
        });
        obj["prevTVData" as keyof typeof obj] = tmp;
      }
      return obj;
    case "sortByScore":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          return b.score - a.score;
        }),
      };
      if (action.payload.prevTVData != null) {
        const tmp = [...action.payload.prevTVData].sort((a, b) => {
          return b.score - a.score;
        });
        obj["prevTVData" as keyof typeof obj] = tmp;
      }
      return obj;
    case "sortByTitle":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        }),
      };
      if (action.payload.prevTVData != null) {
        const tmp = [...action.payload.prevTVData].sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        });
        obj["prevTVData" as keyof typeof obj] = tmp;
      }
      return obj;
    // return {
    //   currentTVData: [...action.payload.currentTVData].sort((a, b) => {
    //     return a.title < b.title ? -1 : 1;
    //   }),
    //   prevTVData: [...action.payload.prevTVData].sort((a, b) => {
    //     return a.title < b.title ? -1 : 1;
    //   }),
    // };

    case "sortByStartDate":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          const aStartDate = new Date(a["aired"]["from"]);
          const bStartDate = new Date(b["aired"]["from"]);
          if (aStartDate == null) return -1;
          if (bStartDate == null) return 1;
          return aStartDate < bStartDate ? -1 : 1;
        }),
      };
      if (action.payload.prevTVData != null) {
        const tmp = [...action.payload.prevTVData].sort((a, b) => {
          const aStartDate = new Date(a["aired"]["from"]);
          const bStartDate = new Date(b["aired"]["from"]);
          if (aStartDate == null) return -1;
          if (bStartDate == null) return 1;
          return aStartDate < bStartDate ? -1 : 1;
        });
        obj["prevTVData" as keyof typeof obj] = tmp;
      }
      return obj;
    // return {
    //   currentTVData: [...action.payload.currentTVData].sort((a, b) => {
    //     const aStartDate = new Date(a["aired"]["from"]);
    //     const bStartDate = new Date(b["aired"]["from"]);
    //     if (aStartDate == null) return -1;
    //     if (bStartDate == null) return 1;
    //     return aStartDate < bStartDate ? -1 : 1;
    //   }),
    //   prevTVData: [...action.payload.prevTVData].sort((a, b) => {
    //     const aStartDate = new Date(a["aired"]["from"]);
    //     const bStartDate = new Date(b["aired"]["from"]);
    //     if (aStartDate == null) return -1;
    //     if (bStartDate == null) return 1;
    //     return aStartDate < bStartDate ? -1 : 1;
    //   }),
    // };

    case "sortByStudio":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          if (a.studios.length == 0) return -1;
          else if (b.studios.length == 0) return 1;
          else if (a.studios.length == 0 && b.studios.length == 0) return 0;
          return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
        }),
      };
      if (action.payload.prevTVData != null) {
        const tmp = [...action.payload.prevTVData].sort((a, b) => {
          if (a.studios.length == 0) return -1;
          else if (b.studios.length == 0) return 1;
          else if (a.studios.length == 0 && b.studios.length == 0) return 0;
          return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
        });
        obj["prevTVData" as keyof typeof obj] = tmp;
      }
      return obj;
    // return {
    //   currentTVData: [...action.payload.currentTVData].sort((a, b) => {
    //     if (a.studios.length == 0) return -1;
    //     else if (b.studios.length == 0) return 1;
    //     else if (a.studios.length == 0 && b.studios.length == 0) return 0;
    //     return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
    //   }),
    //   prevTVData: [...action.payload.prevTVData].sort((a, b) => {
    //     if (a.studios.length == 0) return -1;
    //     else if (b.studios.length == 0) return 1;
    //     else if (a.studios.length == 0 && b.studios.length == 0) return 0;
    //     return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
    //   }),
    // };

    default:
      return state;
  }
};

export default reducer;
