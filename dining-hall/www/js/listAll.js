/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var foodItems = {};

var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
		app.fetchFoodItems();
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},

	fetchFoodItems: function() {
		var url; 
		for (var i = 0; i < locationNums.length; i++) {
			url = this.buildUrl(locationNums[i]);
			console.log(url);
			$.ajax({
				"url":url,
				"crossDomain":true,
				"dataType":"jsonp"
			});
		}
	},

	// <ul data-role="listview" data-filter="true" data-filter-placeholder="Search fruits..." data-inset="true">
	// <li><a href="#">Apple</a></li>
	// <li><a href="#">Banana</a></li>
	// <li><a href="#">Cherry</a></li>
	// <li><a href="#">Cranberry</a></li>
	// <li><a href="#">Grape</a></li>
	// <li><a href="#">Orange</a></li>
	// </ul>

	buildUrl: function(locationNum) {
		return ("http://www.kimonolabs.com/api/3h13ss3m?apikey=07783e2151f40eda9c2a00d625232a54&locationNum=" + locationNum + "&callback=kimonoCallback" + locationNum);
	},

	createList: function(items) {
		var list = $("#foodList");
		if (!(list.length)) {
			list = $('<ul/>', {
				"id": "foodList",
				"data-role": "listview",
				"data-filter": "true",
				"data-filter-placeholder": "Search food...",
				"data-inset": "true",
				"class": "ui-listview ui-listview-inset ui-corner-all ui-shadow"
			});
		}
		return list;
	},

	crossCheckList: function(items, college) {
		var list = app.createList();
		var listItem, listItemName;
		for (var i = 0; i < items.length; i++) {
			if (items[i].lunch) {
				listItemName = items[i].lunch;
			} else {
				listItemName = items[i].dinner;
			}
			if(!foodItems[listItemName]) {
				console.log("New Menu Item Found");
				foodItems[listItemName] = [];
				// New food item
				listItem = $(this.createListItem(listItemName));
				// Set click handler
				listItem.click(setFoodClick);
				// Append to list
				list.append(listItem);
			}
			foodItems[listItemName].push(college);
		}
		list.trigger("change");
	},

	populateList: function(items, list) {
		var listItem;
		for (var i = 0; i < items.length; i++) {
			if (items[i].lunch) {
				console.log("Appending Lunch item");
				listItem = $(this.createListItem(items[i].lunch));
			} else {
				console.log("Appending Dinner item");
				listItem = $(this.createListItem(items[i].dinner));
			}
			// Set click handler
			listItem.click(setFoodClick);
			// Append to list
			list.append(listItem);
		}
	},

	// <a href="#popupDialog" data-rel="popup" data-position-to="window" data-transition="pop" 
	// class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-b" 
	// aria-haspopup="true" aria-owns="popupDialog" aria-expanded="false">Delete page...</a>

	createListItem: function(item) {
		return ('<li><a href="#popupDialog" data-rel="popup" data-position-to="window" data-transition="pop" class="ui-btn ui-btn-icon-right ui-icon-carat-r">' + item + '</a></li>');
	},

	createDivider: function(name) {
		return ('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">' + name + '</li>');
	}
};

function kimonoCallback05(data) {
	kimonoCallback(data, "Cowell");
}

function kimonoCallback20(data) {
	kimonoCallback(data, "Crown");
}

function kimonoCallback25(data) {
	kimonoCallback(data, "Porter");
}

function kimonoCallback30(data) {
	kimonoCallback(data, "Eight");
}

function kimonoCallback40(data) {
	kimonoCallback(data, "Nine");
}

function kimonoCallback(data, college) {
	if (data.lastrunstatus === "success") {
		console.log("Success retrieving Kimono data");
		app.crossCheckList(data.results.collection2, college);
		app.crossCheckList(data.results.collection3, college);
	} else {
		console.log("Failed to get Kimono data");
	}
}

function setFoodClick(event) {
	var food = event.currentTarget.firstChild.firstChild.data;
	$("#foodItemName").text(food);
}
