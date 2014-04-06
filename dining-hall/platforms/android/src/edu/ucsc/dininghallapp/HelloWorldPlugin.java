package edu.ucsc.dininghallapp;

import org.apache.cordova.*;
//import org.apache.cordova.api.CallbackContext;
//import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

public class HelloWorldPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray arguments,
            CallbackContext callbackContext) throws JSONException {

    	Log.v("test", "inside execute");
    	
        if (action.equals("sayHello")) {
            String responseText = "Hello world";
            try {
                responseText += ", " + arguments.getString(0);
                callbackContext.success(responseText);
                return true;
            } catch (JSONException e) {
                callbackContext.error(e.getMessage());
            }
        } else {
            callbackContext.error("Invalid action: " + action);
            return false;
        }
        return false;
    }
}