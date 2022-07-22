package com.example.ColourzApp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import org.w3c.dom.Text;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        TextView textView1 = findViewById(R.id.textSplashScreen);
        textView1.animate().translationY(1000).setDuration(1000).setStartDelay(2400);

        TextView textView2 = findViewById(R.id.textSplashScreen2);
        textView2.animate().translationY(1000).setDuration(1000).setStartDelay(2400);


        Thread thread = new Thread(){
            public void run() {

                try {
                    Thread.sleep(3500);
                }
                catch (Exception e){
                    e.printStackTrace();
                }
                finally {
                    Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
            }
        };
        thread.start();
    }
}