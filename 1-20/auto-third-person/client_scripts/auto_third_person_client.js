
NetworkEvents.dataReceived('mount', e => {
    let { data } = e;
    if (global.clientConfig.customization.enableEntityAutoThirdPerson.get()) {
        if (global.clientConfig.customization.forwardThirdPersonEntities.get().contains(data.type)) {
            if (data.mounting) {
                Client.options.cameraType = 'third_person_back';
            } else {
                Client.options.cameraType = 'first_person';
            }
        } else if (global.clientConfig.customization.reverseThirdPersonEntities.get().contains(data.type)) {
            if (data.mounting) {
                Client.options.cameraType = 'third_person_front';
            } else {
                Client.options.cameraType = 'first_person';
            }
        }
    }
})