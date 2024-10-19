import { ComponentType } from "react";
import { RoutesProvider } from "./RoutesProvider/RoutesProvider";
import { UiProvider } from "./UiProvider/UiProvider";
import { ApiProvider } from "./ApiProvider/ApiProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function RootProvider<T extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>) {
    return (props: T) => {
        return (
            <ApiProvider>
                <UiProvider>
                    <ToastContainer
                        bodyStyle={{
                            direction: 'rtl',
                        }}
                    />
                    <RoutesProvider />
                    <WrappedComponent {...props} />
                </UiProvider>
            </ApiProvider>
        );
    };
}

export default RootProvider