import { auth, db, firebase } from '../firebase';
import { setShowToast } from '../redux/common/actions';
import moment from 'moment';

const signup = async ({ email, password, id, role, fullName }: any) => {
    try {
        let ref: any = await auth.createUserWithEmailAndPassword(email, password);
        if (ref) {
            await ref.user.updateProfile({ displayName: fullName, });
            await db.collection("users").doc(id).set({
                email: email,
                refId: id,
                createdAt: moment().toDate(),
                roleId: role
            });
        }
    } catch (err) {
        setShowToast(true, err.message);
        console.log({ err });
    }
};


const login = async ({ email, password }: any) => {
    try {
        let response = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (response) {
            return { success: true, data: response.user }
        }
    } catch (err) {
        return { success: false, message: err.message }
    }
}

export {
    signup,
    login
}