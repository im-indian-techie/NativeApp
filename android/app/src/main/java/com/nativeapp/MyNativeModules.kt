package com.nativeapp

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyNativeModules(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext),ActivityEventListener {
    private var loginPromise:Promise?=null
    private val activity=currentActivity
    init {
        reactContext.addActivityEventListener(this)
    }
    companion object
    {
        const val LOGIN_REQ_CODE=123
    }
    override fun getName(): String {
        return "LoginModule"
    }

    @ReactMethod
    fun showLogin(promise: Promise)
    {

        loginPromise=promise
      val intent= Intent(currentActivity,LoginActivity::class.java)
        currentActivity?.startActivityForResult(intent, LOGIN_REQ_CODE)
    }

    @ReactMethod
    fun getData(callback: Callback)
    {
        val data= currentActivity!!.intent.getStringExtra("email")
        callback.invoke(data)
    }

    override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {
        if(p1== LOGIN_REQ_CODE && p2==Activity.RESULT_OK && p3!=null)
        {
            val email=p3.getStringExtra("email")
            if(email!=null) {
                loginPromise!!.resolve(email)
            }
            else
            {
                loginPromise!!.reject("No Email", "Login failed to return email")
            }
        }
    }

    override fun onNewIntent(p0: Intent?) {
        TODO("Not yet implemented")
    }
}