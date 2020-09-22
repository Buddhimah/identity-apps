"use strict";
/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousekeepingUtils = void 0;
var cookie_utils_1 = require("./cookie-utils");
var storage_utils_1 = require("./storage-utils");
/// <reference types="cypress" />
var HousekeepingUtils = /** @class */ (function () {
    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    function HousekeepingUtils() {
    }
    HousekeepingUtils.performCleanUpTasks = function () {
        cy.reload(true);
        cookie_utils_1.CookieUtils.clearAllCookies();
        storage_utils_1.StorageUtils.clearLocalStorage();
    };
    return HousekeepingUtils;
}());
exports.HousekeepingUtils = HousekeepingUtils;