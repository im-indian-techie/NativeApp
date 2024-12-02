package com.nativeapp

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.nativeapp.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private val activity=this
    private lateinit var binding: ActivityLoginBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding=ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initUi()
    }

    private fun initUi() {
      binding.btnLogin.setOnClickListener{
          Login()
      }
    }
    private fun Login()
    {
        if(TextUtils.isEmpty(binding.etEmail.text.toString().trim()))
        {
            Toast.makeText(activity,"Please enter email",Toast.LENGTH_SHORT).show()
        }
        else if(TextUtils.isEmpty(binding.etPass.text.toString().trim()))
        {
            Toast.makeText(activity,"Please enter password",Toast.LENGTH_SHORT).show()
        }
        else
        {
           val intent= Intent()
            intent.putExtra("email",binding.etEmail.text.toString().trim())
            setResult(RESULT_OK,intent)
            finish()
        }
    }

}