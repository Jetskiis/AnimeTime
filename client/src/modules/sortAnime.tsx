type ACTIONTYPE =
  | { type: "clearAnimeList" }
  | {
      type: "setAnimeList";
      payload: {
        currentTVData: any;
        prevTVData: any;
        movieData: any;
        ovaData: any;
        onaData: any;
        specialData: any;
      };
    }
  | {
      type: "sortByScore";
      payload: {
        currentTVData: any;
        prevTVData: any;
        movieData: any;
        ovaData: any;
        onaData: any;
        specialData: any;
      };
    }
  | {
      type: "sortByPopularity";
      payload: {
        currentTVData: any;
        prevTVData: any;
        movieData: any;
        ovaData: any;
        onaData: any;
        specialData: any;
      };
    }
  | {
      type: "sortByTitle";
      payload: {
        currentTVData: any;
        prevTVData: any;
        movieData: any;
        ovaData: any;
        onaData: any;
        specialData: any;
      };
    }
  | {
      type: "sortByStartDate";
      payload: {
        currentTVData: any;
        prevTVData: any;
        movieData: any;
        ovaData: any;
        onaData: any;
        specialData: any;
      };
    }
  | {
      type: "sortByStudio";
      payload: {
        currentTVData: any;
        prevTVData: any;
        movieData: any;
        ovaData: any;
        onaData: any;
        specialData: any;
      };
    };

const reducer = (state: any, action: ACTIONTYPE) => {
  let obj;
  switch (action.type) {
    case "clearAnimeList":
      return {};
    case "setAnimeList":
      return {
        currentTVData: action.payload.currentTVData,
        prevTVData: action.payload.prevTVData,
        movieData: action.payload.movieData,
        ovaData: action.payload.ovaData,
        onaData: action.payload.onaData,
        specialData: action.payload.specialData,
      };
    case "sortByPopularity":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          return b.members - a.members;
        }),
        movieData: [...action.payload.movieData].sort((a, b) => {
          return b.members - a.members;
        }),
        ovaData: [...action.payload.ovaData].sort((a, b) => {
          return b.members - a.members;
        }),
        onaData: [...action.payload.onaData].sort((a, b) => {
          return b.members - a.members;
        }),
        specialData: [...action.payload.specialData].sort((a, b) => {
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
        movieData: [...action.payload.movieData].sort((a, b) => {
          return b.score - a.score;
        }),

        ovaData: [...action.payload.ovaData].sort((a, b) => {
          return b.score - a.score;
        }),
        onaData: [...action.payload.onaData].sort((a, b) => {
          return b.score - a.score;
        }),
        specialData: [...action.payload.specialData].sort((a, b) => {
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
        movieData: [...action.payload.movieData].sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        }),
        ovaData: [...action.payload.ovaData].sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        }),
        onaData: [...action.payload.onaData].sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        }),
        specialData: [...action.payload.specialData].sort((a, b) => {
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
    case "sortByStartDate":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          const aStartDate = new Date(a["aired"]["from"]);
          const bStartDate = new Date(b["aired"]["from"]);
          if (aStartDate == null) return -1;
          if (bStartDate == null) return 1;
          return aStartDate < bStartDate ? -1 : 1;
        }),
        movieData: [...action.payload.movieData].sort((a, b) => {
          const aStartDate = new Date(a["aired"]["from"]);
          const bStartDate = new Date(b["aired"]["from"]);
          if (aStartDate == null) return -1;
          if (bStartDate == null) return 1;
          return aStartDate < bStartDate ? -1 : 1;
        }),
        ovaData: [...action.payload.ovaData].sort((a, b) => {
          const aStartDate = new Date(a["aired"]["from"]);
          const bStartDate = new Date(b["aired"]["from"]);
          if (aStartDate == null) return -1;
          if (bStartDate == null) return 1;
          return aStartDate < bStartDate ? -1 : 1;
        }),
        onaData: [...action.payload.onaData].sort((a, b) => {
          const aStartDate = new Date(a["aired"]["from"]);
          const bStartDate = new Date(b["aired"]["from"]);
          if (aStartDate == null) return -1;
          if (bStartDate == null) return 1;
          return aStartDate < bStartDate ? -1 : 1;
        }),
        specialData: [...action.payload.specialData].sort((a, b) => {
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
    case "sortByStudio":
      obj = {
        currentTVData: [...action.payload.currentTVData].sort((a, b) => {
          if (a.studios.length == 0) return -1;
          else if (b.studios.length == 0) return 1;
          else if (a.studios.length == 0 && b.studios.length == 0) return 0;
          return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
        }),
        movieData: [...action.payload.movieData].sort((a, b) => {
          if (a.studios.length == 0) return -1;
          else if (b.studios.length == 0) return 1;
          else if (a.studios.length == 0 && b.studios.length == 0) return 0;
          return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
        }),
        ovaData: [...action.payload.ovaData].sort((a, b) => {
          if (a.studios.length == 0) return -1;
          else if (b.studios.length == 0) return 1;
          else if (a.studios.length == 0 && b.studios.length == 0) return 0;
          return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
        }),
        onaData: [...action.payload.onaData].sort((a, b) => {
          if (a.studios.length == 0) return -1;
          else if (b.studios.length == 0) return 1;
          else if (a.studios.length == 0 && b.studios.length == 0) return 0;
          return a.studios[0]["name"] < b.studios[0]["name"] ? -1 : 1;
        }),
        specialData: [...action.payload.specialData].sort((a, b) => {
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

    default:
      return state;
  }
};

export default reducer;
