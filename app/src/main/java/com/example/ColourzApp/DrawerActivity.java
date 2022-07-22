package com.example.ColourzApp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.FrameLayout;

import com.google.android.material.navigation.NavigationView;

public class DrawerActivity extends AppCompatActivity {

    DrawerLayout drawerLayout;

    @Override
    public void setContentView(View view) {
        drawerLayout = (DrawerLayout) getLayoutInflater().inflate(R.layout.activity_drawer, null);
        FrameLayout container = drawerLayout.findViewById(R.id.activityContainer);
        container.addView(view);
        super.setContentView(drawerLayout);

        Toolbar toolbar = drawerLayout.findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        NavigationView navigationView = drawerLayout.findViewById(R.id.navView);
        navigationView.setNavigationItemSelectedListener(this::onNavigationItemSelected);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.menu_drawer_open, R.string.menu_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
    }

    public boolean onNavigationItemSelected(@NonNull MenuItem item){
        drawerLayout.closeDrawer((GravityCompat.START));

        switch (item.getItemId()){
            case R.id.photoFilters:
                startActivity(new Intent(this, MainActivity.class));
                overridePendingTransition(0, 0);
                break;

            case R.id.liveFilters:
                startActivity(new Intent(this, LiveCameraActivity.class));
                overridePendingTransition(0, 0);
                break;

            case R.id.info:
                startActivity(new Intent(this, AboutActivity.class));
                overridePendingTransition(0, 0);
                break;
        }
        return false;
    }
//    protected void allocateActivityTitle(String titleString){
//        if(getSupportActionBar() != null) {
//            getSupportActionBar().setTitle(titleString);
//        }
//    }

}