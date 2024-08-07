import { Theme } from "../../styles/theme";

const NoItemsFound = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', color: `${Theme.colors.lightDark}` }}>
            <h2>{children}</h2>
        </div>
    );
}

export { NoItemsFound }