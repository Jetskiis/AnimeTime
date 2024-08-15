"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@lucia-auth";
exports.ids = ["vendor-chunks/@lucia-auth"];
exports.modules = {

/***/ "(action-browser)/./node_modules/@lucia-auth/adapter-prisma/dist/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@lucia-auth/adapter-prisma/dist/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PrismaAdapter: () => (/* binding */ PrismaAdapter)\n/* harmony export */ });\nclass PrismaAdapter {\n    sessionModel;\n    userModel;\n    constructor(sessionModel, userModel) {\n        this.sessionModel = sessionModel;\n        this.userModel = userModel;\n    }\n    async deleteSession(sessionId) {\n        try {\n            await this.sessionModel.delete({\n                where: {\n                    id: sessionId\n                }\n            });\n        }\n        catch {\n            // ignore if session id is invalid\n        }\n    }\n    async deleteUserSessions(userId) {\n        await this.sessionModel.deleteMany({\n            where: {\n                userId\n            }\n        });\n    }\n    async getSessionAndUser(sessionId) {\n        const userModelKey = this.userModel.name[0].toLowerCase() + this.userModel.name.slice(1);\n        const result = await this.sessionModel.findUnique({\n            where: {\n                id: sessionId\n            },\n            include: {\n                [userModelKey]: true\n            }\n        });\n        if (!result)\n            return [null, null];\n        const userResult = result[userModelKey];\n        delete result[userModelKey];\n        return [transformIntoDatabaseSession(result), transformIntoDatabaseUser(userResult)];\n    }\n    async getUserSessions(userId) {\n        const result = await this.sessionModel.findMany({\n            where: {\n                userId\n            }\n        });\n        return result.map(transformIntoDatabaseSession);\n    }\n    async setSession(value) {\n        await this.sessionModel.create({\n            data: {\n                id: value.id,\n                userId: value.userId,\n                expiresAt: value.expiresAt,\n                ...value.attributes\n            }\n        });\n    }\n    async updateSessionExpiration(sessionId, expiresAt) {\n        await this.sessionModel.update({\n            where: {\n                id: sessionId\n            },\n            data: {\n                expiresAt\n            }\n        });\n    }\n    async deleteExpiredSessions() {\n        await this.sessionModel.deleteMany({\n            where: {\n                expiresAt: {\n                    lte: new Date()\n                }\n            }\n        });\n    }\n}\nfunction transformIntoDatabaseSession(raw) {\n    const { id, userId, expiresAt, ...attributes } = raw;\n    return {\n        id,\n        userId,\n        expiresAt,\n        attributes\n    };\n}\nfunction transformIntoDatabaseUser(raw) {\n    const { id, ...attributes } = raw;\n    return {\n        id,\n        attributes\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9AbHVjaWEtYXV0aC9hZGFwdGVyLXByaXNtYS9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVDQUF1QztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FuaWNoYXJ0Ly4vbm9kZV9tb2R1bGVzL0BsdWNpYS1hdXRoL2FkYXB0ZXItcHJpc21hL2Rpc3QvaW5kZXguanM/MzUyOSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUHJpc21hQWRhcHRlciB7XG4gICAgc2Vzc2lvbk1vZGVsO1xuICAgIHVzZXJNb2RlbDtcbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uTW9kZWwsIHVzZXJNb2RlbCkge1xuICAgICAgICB0aGlzLnNlc3Npb25Nb2RlbCA9IHNlc3Npb25Nb2RlbDtcbiAgICAgICAgdGhpcy51c2VyTW9kZWwgPSB1c2VyTW9kZWw7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZVNlc3Npb24oc2Vzc2lvbklkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNlc3Npb25Nb2RlbC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBzZXNzaW9uSWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgaWYgc2Vzc2lvbiBpZCBpcyBpbnZhbGlkXG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlVXNlclNlc3Npb25zKHVzZXJJZCkge1xuICAgICAgICBhd2FpdCB0aGlzLnNlc3Npb25Nb2RlbC5kZWxldGVNYW55KHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgdXNlcklkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBnZXRTZXNzaW9uQW5kVXNlcihzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc3QgdXNlck1vZGVsS2V5ID0gdGhpcy51c2VyTW9kZWwubmFtZVswXS50b0xvd2VyQ2FzZSgpICsgdGhpcy51c2VyTW9kZWwubmFtZS5zbGljZSgxKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5zZXNzaW9uTW9kZWwuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGlkOiBzZXNzaW9uSWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgW3VzZXJNb2RlbEtleV06IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgY29uc3QgdXNlclJlc3VsdCA9IHJlc3VsdFt1c2VyTW9kZWxLZXldO1xuICAgICAgICBkZWxldGUgcmVzdWx0W3VzZXJNb2RlbEtleV07XG4gICAgICAgIHJldHVybiBbdHJhbnNmb3JtSW50b0RhdGFiYXNlU2Vzc2lvbihyZXN1bHQpLCB0cmFuc2Zvcm1JbnRvRGF0YWJhc2VVc2VyKHVzZXJSZXN1bHQpXTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0VXNlclNlc3Npb25zKHVzZXJJZCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNlc3Npb25Nb2RlbC5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIHVzZXJJZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAodHJhbnNmb3JtSW50b0RhdGFiYXNlU2Vzc2lvbik7XG4gICAgfVxuICAgIGFzeW5jIHNldFNlc3Npb24odmFsdWUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXNzaW9uTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogdmFsdWUuaWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB2YWx1ZS51c2VySWQsXG4gICAgICAgICAgICAgICAgZXhwaXJlc0F0OiB2YWx1ZS5leHBpcmVzQXQsXG4gICAgICAgICAgICAgICAgLi4udmFsdWUuYXR0cmlidXRlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgdXBkYXRlU2Vzc2lvbkV4cGlyYXRpb24oc2Vzc2lvbklkLCBleHBpcmVzQXQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXNzaW9uTW9kZWwudXBkYXRlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgaWQ6IHNlc3Npb25JZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBleHBpcmVzQXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZUV4cGlyZWRTZXNzaW9ucygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXNzaW9uTW9kZWwuZGVsZXRlTWFueSh7XG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGV4cGlyZXNBdDoge1xuICAgICAgICAgICAgICAgICAgICBsdGU6IG5ldyBEYXRlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybUludG9EYXRhYmFzZVNlc3Npb24ocmF3KSB7XG4gICAgY29uc3QgeyBpZCwgdXNlcklkLCBleHBpcmVzQXQsIC4uLmF0dHJpYnV0ZXMgfSA9IHJhdztcbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBleHBpcmVzQXQsXG4gICAgICAgIGF0dHJpYnV0ZXNcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtSW50b0RhdGFiYXNlVXNlcihyYXcpIHtcbiAgICBjb25zdCB7IGlkLCAuLi5hdHRyaWJ1dGVzIH0gPSByYXc7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQsXG4gICAgICAgIGF0dHJpYnV0ZXNcbiAgICB9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/@lucia-auth/adapter-prisma/dist/index.js\n");

/***/ })

};
;