package com.fitlife

import android.os.Bundle
import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }

    override fun getMainComponentName(): String? {
        return "FitLife"
    }
}