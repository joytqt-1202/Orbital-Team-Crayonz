package com.example.ColourzApp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.ColourzApp.databinding.ActivityMainBinding;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MainActivity extends DrawerActivity {

    ActivityMainBinding activityMainBinding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityMainBinding = ActivityMainBinding.inflate(getLayoutInflater());
//        setContentView(R.layout.activity_main);
        setContentView(activityMainBinding.getRoot());
        init();
    }

    private static final int REQUEST_PERMISSIONS = 1234;
    private static final String[] PERMISSIONS = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.CAMERA
    };

    private static final int PERMISSIONS_COUNT = 3;

    @SuppressLint("NewApi")
    private boolean notPermissions(){
        for (int i = 0; i < PERMISSIONS_COUNT; i++){
            if(checkSelfPermission(PERMISSIONS[i]) != PackageManager.PERMISSION_GRANTED){
                return true;
            }
        }
        return false;
    }

    static{
        System.loadLibrary("colourzApp");
    }

//    private static native void blackAndWhite(int[] pixels, int width, int height);
    private static native void colourBlind(int[] pixels, int width, int height);
    private static native void rgColourBlindness(int[] pixels, int width, int height);
    private static native void gWeak(int[] pixels, int width, int height);
    private static native void bColourBlindness(int[] pixels, int width, int height);

    @Override
    protected void onResume(){
        super.onResume();
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && notPermissions()){
            requestPermissions(PERMISSIONS, REQUEST_PERMISSIONS);
        }
    }

//    @Override
    public void setRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults){
        super.onRequestPermissionsResult(requestCode,permissions,grantResults);
        if (requestCode == REQUEST_PERMISSIONS && grantResults.length > 0){
            if(notPermissions()){
                ((ActivityManager) this.getSystemService(ACTIVITY_SERVICE)).clearApplicationUserData();
                recreate();
            }
        }
    }
    public void onBackPressed(){
        if(editMode){
            findViewById(R.id.editScreen).setVisibility(View.GONE);
            findViewById(R.id.welcomeScreen).setVisibility(View.VISIBLE);
            editMode = false;
        } else if(drawerLayout.isDrawerOpen(GravityCompat.START)){
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    private static final int REQUEST_PICK_IMAGE = 12345;
    private ImageView imageView;

//    Only initialise if user has granted permission
    private void init(){

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N){
            StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
            StrictMode.setVmPolicy(builder.build());
        }

        imageView = findViewById(R.id.imageView);

        if(!MainActivity.this.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)){
            findViewById(R.id.takePhotoButton).setVisibility(View.GONE);
        }

        final Button selectImageButton = findViewById(R.id.selectImageButton);

        selectImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.setType("image/*");
                final Intent pickIntent = new Intent(Intent.ACTION_PICK);
                pickIntent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
                final Intent chooserIntent = Intent.createChooser(intent, "Select Image");
                startActivityForResult(chooserIntent, REQUEST_PICK_IMAGE);
            }
        });

        final Button takePhotoButton = findViewById(R.id.takePhotoButton);

        takePhotoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if(takePictureIntent.resolveActivity(getPackageManager()) == null){
                    //create file to store photo that was just taken
                    final File photoFile = createImageFile();
                    imageUri = Uri.fromFile(photoFile);
                    final SharedPreferences myPrefs = getSharedPreferences(appID, 0);
                    myPrefs.edit().putString("path", photoFile.getAbsolutePath()).apply();
                    takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
                    startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);

                } else {
                    Toast.makeText(MainActivity.this, "Your Camera is not compatible with Colourz",
                            Toast.LENGTH_SHORT).show();
                }
            }
        });


        final Button bnwButton = findViewById(R.id.blackAndWhite);
        final Button rgBlindButton = findViewById(R.id.redGreenBlind);
//        final Button gWeakButton = findViewById(R.id.greenWeak);
        final Button blueBlindButton = findViewById(R.id.blueBlind);

        applyFilterOnClick(bnwButton);
        applyFilterOnClick(rgBlindButton);
//        applyFilterOnClick(gWeakButton);
        applyFilterOnClick(blueBlindButton);

//        final Button blackAndWhiteButton = findViewById(R.id.blackAndWhite);
//        blackAndWhiteButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                new Thread() {
//                    public void run() {
//                        blackAndWhite(pixels, width, height);
//                        bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
//
//                        runOnUiThread(new Runnable() {
//                            @Override
//                            public void run() {
//                                imageView.setImageBitmap(bitmap);
//                            }
//                        });
//                    }
//                }.start();
//            }
//        });

        final ImageView saveImageButton = findViewById(R.id.saveImage);
        saveImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                final DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if(which == DialogInterface.BUTTON_POSITIVE){
                            final  File outFile = createImageFile();
                            try(FileOutputStream out = new FileOutputStream(outFile)) {
                                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
                                imageUri = Uri.parse("file://" + outFile.getAbsolutePath());
                                sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, imageUri));
                                Toast.makeText(MainActivity.this, "Image saved successfully!", Toast.LENGTH_SHORT).show();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                };
                builder.setMessage("Save current photo to gallery?").
                        setPositiveButton("Yes", dialogClickListener).
                        setNegativeButton("No", dialogClickListener).show();
            }
        });

//        final  Button goBackButton = findViewById(R.id.goBack);
//        goBackButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                findViewById(R.id.editScreen).setVisibility(View.GONE);
//                findViewById(R.id.welcomeScreen).setVisibility(View.VISIBLE);
//                editMode = false;
//            }
//        });
//
        final ImageView goBackButton2 = findViewById(R.id.goBack);
        goBackButton2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                findViewById(R.id.editScreen).setVisibility(View.GONE);
                findViewById(R.id.welcomeScreen).setVisibility(View.VISIBLE);
                editMode = false;
            }
        });

    }
    private static final int REQUEST_IMAGE_CAPTURE = 1012;

    private static final String appID = "ColourzApp";

    private Uri imageUri;

    private File createImageFile(){
        final String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        final String imageFileName = "/JPEG_" + timeStamp + ".jpg";
        final File storageDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        return new File(storageDir + imageFileName);
    }

    private boolean editMode = false;
    private Bitmap bitmap;
    private Bitmap originalPic;
    private int width = 0;
    private int height = 0;
    private static final int MAX_PIXEL_COUNT = 2048;

    private int[] pixels;
    private int pixelCount = 0;

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode != RESULT_OK){
            return;
        }

        if(requestCode == REQUEST_IMAGE_CAPTURE){
            if(imageUri == null){
                final SharedPreferences p = getSharedPreferences(appID, 0);
                final String path = p.getString("path", "");
                if(path.length() < 1){
                    recreate();
                    return;
                }
                imageUri = Uri.parse("file://" + path);
            }
            sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, imageUri));
        } else if (data == null){
            recreate();
            return;
        } else if(requestCode == REQUEST_PICK_IMAGE) {
            imageUri = data.getData();
        }

        final ProgressDialog dialog = ProgressDialog.show(MainActivity.this, "Loading",
                "Please wait", true);

        editMode = true;

        findViewById(R.id.welcomeScreen).setVisibility(View.GONE);
        findViewById(R.id.editScreen).setVisibility(View.VISIBLE);

        new Thread(){
            public void run(){
                bitmap = null;
                final BitmapFactory.Options bmpOptions = new BitmapFactory.Options();
                bmpOptions.inBitmap = bitmap;
                bmpOptions.inJustDecodeBounds = true;
                try (InputStream input = getContentResolver().openInputStream(imageUri)){
                    bitmap = BitmapFactory.decodeStream(input, null, bmpOptions);
                }catch (IOException e){
                    e.printStackTrace();
                }
                bmpOptions.inJustDecodeBounds = false;
                width = bmpOptions.outWidth;
                height = bmpOptions.outHeight;
                int resizeScale = 1;
                if(width > MAX_PIXEL_COUNT){
                    resizeScale = width/MAX_PIXEL_COUNT;
                } else if(height > MAX_PIXEL_COUNT){
                    resizeScale = height/MAX_PIXEL_COUNT;
                }
                if(width / resizeScale > MAX_PIXEL_COUNT || height / resizeScale > MAX_PIXEL_COUNT){
                    resizeScale++;
                }
                bmpOptions.inSampleSize = resizeScale;
                InputStream input = null;
                try{
                    input = getContentResolver().openInputStream(imageUri);
                } catch (FileNotFoundException e){
                    e.printStackTrace();
                    recreate();
                    return;
                }
                bitmap = BitmapFactory.decodeStream(input, null, bmpOptions);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        imageView.setImageBitmap(bitmap);
                        dialog.cancel();
                    }
                });
                width = bitmap.getWidth();
                height = bitmap.getHeight();
                bitmap = bitmap.copy(Bitmap.Config.ARGB_8888, true);

                pixelCount = width * height;
                pixels = new int[pixelCount];
                bitmap.getPixels(pixels, 0, width, 0, 0, width, height);

                originalPic = bitmap.copy(bitmap.getConfig(), true);
            }
        }.start();

        dialog.cancel();
    }

    private int filtered = 0;
    // 0 = not filtered
    // 1 = colour blind - black and white
    // 2 = rg blind
    // 3 = green weak
    // 4 = blue blind
    // 5?

    private int originalTint;
    private void applyFilterOnClick(Button button) {

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                int buttonBackground = getFilterOriginalTint(categoriseButton(button));
//                int buttonBackground = 0;

                // if statement is just to pass java compiler check
                // we know that it will always pass this check
                // since we set the colour at the start of the code
//                if (button.getBackground() instanceof ColorDrawable) {
//                }

                boolean isCurrentFilter = (filtered == categoriseButton(button));

                // if filtered
                if (filtered != 0) {
                    resetImage();

                    // if the filter of the button pressed was previously applied...
                    if (isCurrentFilter) {
                        // change the colour of the button back to original
                        button.setBackgroundColor(originalTint);

                    } else {
                    // if the filter of the button pressed was NOT previously applied...
                    // set all buttons to blue
                        findViewById(R.id.blackAndWhite).setBackgroundColor(getResources().getColor(R.color.bnwTint));
                        findViewById(R.id.redGreenBlind).setBackgroundColor(getResources().getColor(R.color.rgBlindTint));
//                        findViewById(R.id.greenWeak).setBackgroundColor(getResources().getColor(R.color.gWeakTint));
                        findViewById(R.id.blueBlind).setBackgroundColor(getResources().getColor(R.color.bBlindTint));

                        applyFilter(button);
                    }
                } else {
                    applyFilter(button);
                }
            }
        });
    }



    private void resetImage() {
        originalPic.getPixels(pixels, 0, width, 0, 0, width, height);
        bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
        imageView.setImageBitmap(originalPic);

//        we dont want to work with threads because of the differing speeds that the jobs complete

//        Thread resetImageThread = new Thread(new Runnable(){
//            @Override
//            public void run() {
//                originalPic.getPixels(pixels, 0, width, 0, 0, width, height);
//                bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
//                imageView.setImageBitmap(originalPic);
//
//            }
//        });
//
//        resetImageThread.start();
//        try {
//            resetImageThread.join();
//        } catch (InterruptedException e) {
//            Toast.makeText( MainActivity.this, "Unable to load filter. Please try again.",
//                    Toast.LENGTH_SHORT).show();
//        }
        filtered = 0;
    }

    private void applyFilter(Button button) {

        // apply the appropriate C native function according to the button pressed
        if(button == findViewById(R.id.blackAndWhite)) {
            colourBlind(pixels, width, height);
        } else if (button == findViewById(R.id.redGreenBlind)) {
            rgColourBlindness(pixels, width, height);
//        } else if (button == findViewById(R.id.greenWeak)) {
//            gWeak(pixels, width, height);
        } else { // if (button == findViewById(R.id.blueBlind)) - not fully configured for all filters
            bColourBlindness(pixels, width, height);
        }

        bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
        imageView.setImageBitmap(bitmap);

//        new Thread() {
//            public void run() {
//
//                // apply the appropriate C native function according to the button pressed
//                if(button == findViewById(R.id.colourBlindButton)) {
//                    colourBlind(pixels, width, height);
//                } else if (button == findViewById(R.id.rBlindButton)) {
//                    rColourBlindness(pixels, width, height);
//                } else if (button == findViewById(R.id.gBlindButton)) {
//                    gColourBlindness(pixels, width, height);
//                } else { // if (button == findViewById(R.id.bBlindButton))
//                    bColourBlindness(pixels, width, height);
//                }
//
//                bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
//
//                runOnUiThread(new Runnable() {
//                    @Override
//                    public void run() {
//                        imageView.setImageBitmap(bitmap);
//                    }
//                });
//            }
//        }.start();

        filtered = categoriseButton(button);
        button.setBackgroundColor(getResources().getColor(R.color.purple));
    }

    private int categoriseButton(Button button) {
        if (button == findViewById(R.id.blackAndWhite)) {
            originalTint = getResources().getColor(R.color.bnwTint);
            return 1;
        } else if (button == findViewById(R.id.redGreenBlind)) {
            originalTint = getResources().getColor(R.color.rgBlindTint);
            return 2;
//        } else if (button == findViewById(R.id.greenWeak)) {
//            originalTint = getResources().getColor(R.color.gWeakTint);
//            return 3;
        } else {
            originalTint = getResources().getColor(R.color.bBlindTint);
            return 4;
        }
    }

}