// Fonte:
// - https://github.com/mqttjs/MQTT.js#react 
// - https://www.emqx.com/en/blog/connect-to-mqtt-broker-with-websocket#connection-options 
// - https://github.com/emqx/emqx-tutorial/blob/master/en/client_dev/javascript.md
// - https://www.npmjs.com/package/mqtt 

import './App.css'
import React from 'react'


import mqtt from 'mqtt/dist/mqtt'
import { useEffect } from 'react'

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

export default function App() {
  const [connectionStatus, setConnectionStatus] = React.useState(false)
  const [messages, setMessages] = React.useState()

  const host = 'wss://broker.emqx.io:8084/mqtt'

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    }
  }

  useEffect(() => {
    
    
    console.log('Connecting mqtt client')
    const client = mqtt.connect(host, options)
    client.on('connect', () => {
      setConnectionStatus(true)
      client.subscribe('CASA/temperatura1')
    })

    client.on('message', (topic, payload, packet) => {
      setMessages(payload.toString())
      console.log('New message: ' + payload.toString())
    })
  }, [])

  console.log('Connections: ' + connectionStatus)

  return (
 
      <div>
        <div>Temperatura: {messages && messages}</div>
      </div>
 
  )
}
