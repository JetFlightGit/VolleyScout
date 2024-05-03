import {
  KeyboardAvoidingView,
  Modal as ModalRN,
  ModalProps,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

export const Modal = ({ isOpen, withInput, children, ...rest }: PROPS) => {
  const height = useHeaderHeight();

  const content = withInput ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height - 500}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>{children}</View>
  );

  return (
    <ModalRN
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 900,
  },
});
