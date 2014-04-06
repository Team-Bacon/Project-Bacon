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

//i like turtles 
//me too
//What is a Turtle?
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
		var url = this.buildUrl();
		console.log(url);
		$.ajax({
			"url":url,
			"crossDomain":true,
			"dataType":"jsonp"
		});
	},

	// <ul data-role="listview" data-filter="true" data-filter-placeholder="Search fruits..." data-inset="true">
	// <li><a href="#">Apple</a></li>
	// <li><a href="#">Banana</a></li>
	// <li><a href="#">Cherry</a></li>
	// <li><a href="#">Cranberry</a></li>
	// <li><a href="#">Grape</a></li>
	// <li><a href="#">Orange</a></li>
	// </ul>

	buildUrl: function() {
		return ("http://www.kimonolabs.com/api/3h13ss3m?apikey=07783e2151f40eda9c2a00d625232a54&locationNum=" + locationNum + "&callback=kimonoCallback");
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

	populateList: function(items, list) {
		for (var i = 0; i < items.length; i++) {
			if (items[i].lunch) {
				console.log("Appending Lunch item");
				list.append(this.createListItem(items[i].lunch));
			} else {
				console.log("Appending Dinner item");
				list.append(this.createListItem(items[i].dinner));
			}
		}
	},

	createListItem: function(item) {
		return ('<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r">' + item + '</a></li>');
	},

	createDivider: function(name) {
		return ('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">' + name + '</li>');
	}
};

function kimonoCallback(data) {
	if (data.lastrunstatus === "success") {
		console.log("Success retrieving Kimono data");
		var list = app.createList();
		$(".app").append(list);
		list.append(app.createDivider(data.results.collection1[0].meal));
		app.populateList(data.results.collection2, list);
		list.append(app.createDivider(data.results.collection1[1].meal));
		app.populateList(data.results.collection3, list);
		list.trigger("change");
	} else {
		console.log("Failed to get Kimono data");
	}
}
