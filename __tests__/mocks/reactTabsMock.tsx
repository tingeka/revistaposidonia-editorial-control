// __tests__/mocks/reactTabsMock.ts
export const Tabs = ({ children }: any) => <div data-testid="tabs">{children}</div>;
export const TabList = ({ children }: any) => <div data-testid="tab-list">{children}</div>;
export const Tab = ({ children }: any) => <button data-testid="tab">{children}</button>;
export const TabPanel = ({ children }: any) => <div data-testid="tab-panel">{children}</div>;
