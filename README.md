## Ionic Components for Rax

These are Rax specific building blocks on top of  [@ionic/core](https://www.npmjs.com/package/@ionic/core) components/services.

### Install
```
npm install rax-ionic ionicons --save
```

### Usage
```jsx
import { createElement, Fragment, useState } from 'rax';
import { IonActionSheet, IonButton } from 'rax-ionic';
import { trash, share, playCircleOutline, heart, close } from 'ionicons/icons';
import 'rax-ionic/css/ionic.css';

export default function ActionSheetExample() {
  const [showActionSheet, setShowActionSheet] = useState(false);

  return (
    <>
      <IonButton onClick={() => setShowActionSheet(true)} expand="block">Show Action Sheet</IonButton>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={[{
          text: 'Delete',
          role: 'destructive',
          icon: trash,
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Share',
          icon: share,
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Play (open modal)',
          icon: playCircleOutline,
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Favorite',
          icon: heart,
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: close,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]}
      >
      </IonActionSheet>
    </>

  );
}
```

## Current Status of Components

Below is a list of components yet to be implemented:

| Component |
| ------------------ |
| `IonVirtualScroll` |

## Related

* [Ionic Documentation](https://ionicframework.com/docs/)
* [Ionicons](http://ionicons.com/)

## License

* MIT