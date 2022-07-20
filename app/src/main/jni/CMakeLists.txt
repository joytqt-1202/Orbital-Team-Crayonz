cmake_minimum_required(VERSION 3.6)

add_library(colourzApp SHARED colourzApp.c)

target_link_libraries(colourzApp android)