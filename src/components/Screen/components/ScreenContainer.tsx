import { ScrollView, View } from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
}

export function ScrollViewContainer({
  children,
  backgroundColor
}: ScreenContainerProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        backgroundColor,
        flex: 1
      }}
    >
      {children}
    </ScrollView>
  );
}

export function ViewContainer({
  children,
  backgroundColor
}: ScreenContainerProps) {
  return (
    <View
      style={{
        backgroundColor,
        flex: 1
      }}
    >
      {children}
    </View>
  );
}
