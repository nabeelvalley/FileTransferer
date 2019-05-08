import { Component, OnInit } from '@angular/core';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import * as Mqtt from '../lib/browserMqtt'
import * as mqtt from 'mqtt'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  client: mqtt.MqttClient;
  wifiIpAddress: string;

  constructor(private networkInterface: NetworkInterface) {
    this.networkInterface.getWiFiIPAddress().then((ip) => {
      this.wifiIpAddress = ip;
    })
  }

  ngOnInit() {
    this.client.on('connect', () => {
      console.log('connected to ws');
    })

    this.client.on('error', (err) => {
      console.log(err);
    })
  }

  sendMessage(topic: string, message: string): void {
    this.client.publish(topic, message);
  }
}
