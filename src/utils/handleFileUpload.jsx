import { uploadBytesResumable , ref , getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase';

export const handleFileUpload = (e) => {
    const storageRef = ref(storage, `/files/${e.target.files[0].name}`)
    const uploadTask = uploadBytesResumable(storageRef , e.target.files[0])

    uploadTask.on(() => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // setImg(url);
          });
      }
  ); 
  }