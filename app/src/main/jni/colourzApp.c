#include <jni.h>


JNIEXPORT void JNICALL
Java_com_example_ColourzApp_MainActivity_blackAndWhite(JNIEnv *env, jclass type, jintArray pixels_,
                                                       jint width, jint height) {


    jint *pixels = (*env)->GetIntArrayElements(env, pixels_, NULL);

    unsigned char *colors = (unsigned char *) pixels;

    int pixelCount = width * height * 4;

    //0 == blue, 1 == green, 2 == red

    int i = 0;
    while (i < pixelCount) {
        //RED-GREEN complete BLIND- Protanopia and Deuteranopia
//        unsigned char average = (colors[i + 1] + colors[i + 2]) / 2;
//        colors[i] = 0; //b
//        colors[i + 1] = average; //g
//        colors[i + 2] = average; // r

        //TRITANOPIA
//        unsigned char average = (colors[i] + colors[i + 1]) / 2;
//        colors[i] = average; //b
//        colors[i + 1] = average; //g
//        colors[i + 2] = average; // r

//         unsigned char average = (colors[i] + colors[i + 1]) / 2;
//                if(colors[i] == 255 && colors[i + 1] == 255 && colors[i + 2] == 255){
//                    colors[i] = 255;
//                    colors[i + 1] = 255;
//                    colors[i + 2] =255;
//                } else  {
//                    colors[i] = average; //b
//                    colors[i + 1] = average; //g
//                }
        //MONOCHROMATIC
        unsigned char average = ( colors[i] + colors[i + 1] + colors[i + 2] ) / 3;
        colors[i] = average; //b
        colors[i + 1] = average; //g
        colors[i + 2] = average; // r





        i += 4; //point to the next pixel
    }

    (*env)->ReleaseIntArrayElements(env, pixels_, pixels, 0);
}