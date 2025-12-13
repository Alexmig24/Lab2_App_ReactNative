import {View, Text}  from "react-native";
import { styles } from "./container.styles.jsx";

export const Container = ({children}) => {
    return <View style={styles.Container}>
        {children}
    </View>
}
