Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'Nickname',
        fieldLabel: 'Nickname',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your nickname");
            return false;
          } else {
            return true;
          }
        },
    },
       {
        fieldName: 'ProfileType',
        fieldLabel: 'Type of profile',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Select your role',
        data:[{
            id: 1,
            label: 'Buyer'
          }, {
            id: 2,
            label: 'Seller'
            }],
        visible: true
    },
    {
        fieldName: 'avatar',
        fieldLabel: 'avatar',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Select your avatar',
        data:[{
            id: 1,
            label: 'Doctor',
            value: 'Doctor.png'
          }, {
            id: 2,
            label: 'Firefighter',
            value: 'Firefighter.png',
            }, {
            id: 3,
            label: 'Kid',
            value: 'Kid.png',
            }, {
            id: 4,
            label: 'King',
            value: 'King.png',
            }, {
            id: 5,
            label: 'Mermaid',
            value: 'Mermaid.png',
            }, {
            id: 6,
            label: 'Ninja',
            value: 'Ninja.png',
                        }, {
            id: 7,
            label: 'Nurse',
            value: 'Nurse.png',
            }, {
            id: 8,
            label: 'Robot',
            value: 'Robot.png',
            }, {
            id: 9,
            label: 'Snowman',
            value: 'Snowman.png',
        }],
        visible: true
    }]
});

