package com.example.ColourzApp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.ColourzApp.databinding.ActivityLiveCameraBinding;
import com.example.ColourzApp.databinding.ActivityMainBinding;

public class LiveCameraActivity extends DrawerActivity {

    ActivityLiveCameraBinding  activityLiveCameraBinding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityLiveCameraBinding = ActivityLiveCameraBinding.inflate(getLayoutInflater());
        setContentView(activityLiveCameraBinding.getRoot());
    }
}