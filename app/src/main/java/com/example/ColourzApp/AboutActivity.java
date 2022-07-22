package com.example.ColourzApp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.ColourzApp.databinding.ActivityAboutBinding;
import com.example.ColourzApp.databinding.ActivityMainBinding;

public class AboutActivity extends DrawerActivity {

    ActivityAboutBinding activityAboutBinding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityAboutBinding = ActivityAboutBinding.inflate(getLayoutInflater());
        setContentView(activityAboutBinding.getRoot());
    }
}