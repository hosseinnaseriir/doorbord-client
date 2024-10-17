import { ComponentType } from "react";
import { RoutesProvider } from "./RoutesProvider/RoutesProvider";
import { UiProvider } from "./UiProvider/UiProvider";

function RootProvider<T extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>) {
    return (props: T) => {
        return (
            <UiProvider>
                <RoutesProvider />
                <WrappedComponent {...props} />
            </UiProvider>
        );
    };
}

export default RootProvider