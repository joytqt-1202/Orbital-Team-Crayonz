#include <jni.h>
#include <math.h>

//JNIEXPORT void JNICALL
//Java_com_example_ColourzApp_MainActivity_blackAndWhite(JNIEnv *env, jclass type, jintArray pixels_,
//                                                       jint width, jint height) {
//
//
//    jint *pixels = (*env)->GetIntArrayElements(env, pixels_, NULL);
//
//    unsigned char *colors = (unsigned char *) pixels;
//
//    int pixelCount = width * height * 4;
//
//    //0 == blue, 1 == green, 2 == red
//
//    int i = 0;
//    while (i < pixelCount) {
//        //RED-GREEN complete BLIND- Protanopia and Deuteranopia
//  //        unsigned char average = (colors[i + 1] + colors[i + 2]) / 2;
//  //        colors[i] = 0; //b
//  //        colors[i + 1] = average; //g
//  //        colors[i + 2] = average; // r
//
//        //TRITANOPIA
//  //        unsigned char average = (colors[i] + colors[i + 1]) / 2;
//  //        colors[i] = average; //b
//  //        colors[i + 1] = average; //g
//  //        colors[i + 2] = average; // r
//
//  //         unsigned char average = (colors[i] + colors[i + 1]) / 2;
//  //                if(colors[i] == 255 && colors[i + 1] == 255 && colors[i + 2] == 255){
//  //                    colors[i] = 255;
//  //                    colors[i + 1] = 255;
//  //                    colors[i + 2] =255;
//  //                } else  {
//  //                    colors[i] = average; //b
//  //                    colors[i + 1] = average; //g
//  //                }
//        //MONOCHROMATIC
//        unsigned char average = ( colors[i] + colors[i + 1] + colors[i + 2] ) / 3;
//        colors[i] = average; //b
//        colors[i + 1] = average; //g
//        colors[i + 2] = average; // r
//
//        i += 4; //point to the next pixel
//    }
//
//    (*env)->ReleaseIntArrayElements(env, pixels_, pixels, 0);
//}

JNIEXPORT void JNICALL
Java_com_example_ColourzApp_MainActivity_colourBlind(JNIEnv *env, jclass clazz, jintArray pixels_,
                                                     jint width, jint height) {
    jint *pixels = (*env)->GetIntArrayElements(env, pixels_, NULL);
    char *colors = (char *) pixels;

    int pixelCount = width * height * 4;

    int i = 0;
    while(i < pixelCount) {
        unsigned char average = (colors[i] * 0.07) + (colors[i+1] * 0.72) + (colors[i+2] * 0.21);
        // blue
        colors[i] = average;
        // green
        colors[i+1] = average;
        // red
        colors[i+2] = average;
        i += 4;
    }

    (*env)->ReleaseIntArrayElements(env, pixels_, pixels, 0);
}

JNIEXPORT void JNICALL
Java_com_example_ColourzApp_MainActivity_rgColourBlindness(JNIEnv *env, jclass clazz,
                                                           jintArray pixels_, jint width,
                                                           jint height) {
    jint *pixels = (*env)->GetIntArrayElements(env, pixels_, NULL);

    char *colors = (char *) pixels;

    int pixelCount = width * height * 4;

    int i = 0;
    while(i < pixelCount) {
        unsigned char average = (1.5 * colors[i+1] + 0.5 * colors[i+2]) / 2;
        // blue
        // colors[i] = average;
        // green
        colors[i+1] = average;
        // red
        colors[i+2] = average;
        i += 4;
    }

    (*env)->ReleaseIntArrayElements(env, pixels_, pixels, 0);
}

JNIEXPORT void JNICALL
Java_com_example_ColourzApp_MainActivity_gWeak(JNIEnv *env, jclass clazz, jintArray pixels_,
                                               jint width, jint height) {
    jint *pixels = (*env)->GetIntArrayElements(env, pixels_, NULL);

    char *colors = (char *) pixels;

    int pixelCount = width * height * 4;

    int i = 0;

    while (i < pixelCount) {
        unsigned char average = (0.1 * colors[i] + 1.9 * colors[i + 2]) / 2;
        // blue
        // colors[i] = 0.992052 * pow(colors[i] / 255, 2.2) + 0.003974;
        double valB = colors[i];
        // green
        double valG = 0.494207 * colors[i + 2] + 1.24827 * colors[i];
        // red
        // colors[i+2] = 0.992052 * pow(colors[i+2] / 255, 2.2) + 0.003974;
        double valR = colors[i + 2];

        colors[i + 2] = 255 * pow(0.080944 * valR - 0.130504 * valG + 0.116721 * valB, 1 / 2.2);
        colors[i + 1] = 255 * pow(-0.0102485 * valR + 0.0540194 * valG - 0.113615 * valB, 1 / 2.2);
        colors[i] = 255 * pow(-0.000365294 * valR - 0.00412163 * valG + 0.693513 * valB, 1 / 2.2);

        i += 4;
    }

    (*env)->ReleaseIntArrayElements(env, pixels_, pixels, 0);

}

JNIEXPORT void JNICALL
Java_com_example_ColourzApp_MainActivity_bColourBlindness(JNIEnv *env, jclass clazz,
                                                          jintArray pixels_, jint width,
                                                          jint height) {
    jint *pixels = (*env)->GetIntArrayElements(env, pixels_, NULL);

    char *colors = (char *) pixels;

    int pixelCount = width * height * 4;

    int i = 0;
    while(i < pixelCount) {
        unsigned char average = (1.1*colors[i] + 0.9*colors[i+2]) / 2;
        // blue
        colors[i] = average;
        // green
        colors[i+1] = average;
        // red
        // colors[i+2] = average;
        i += 4;
    }

    (*env)->ReleaseIntArrayElements(env, pixels_, pixels, 0);
}