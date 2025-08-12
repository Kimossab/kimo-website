### Garden Automatic Irrigation System

In order to learn a bit more about electronics and home automation, as well as reduce the huge amount of time wasted watering the garden, I created a PCB that controls the eletrovalves of the irrigation system.

The PCB is controlled by an ESP8266, connected to my home wi-fi network and configured with Home Assistant. The firmware for the ESP was created using [ESPHome](https://esphome.io/index.html), which simplifies everything and allows me to update the firmware over the air.  

This way I can easily control the irrigation through an automation in Home Assistant and control each valve individually through the app.  

The schematic of the PCB
[![Schematic](/rega-pcb.png)](/rega-pcb.png)