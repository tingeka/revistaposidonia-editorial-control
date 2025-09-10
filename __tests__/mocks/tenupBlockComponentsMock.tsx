// __tests__/mocks/tenupBlockComponentsMock.ts
export const ContentSearch = ({ onSelectItem, placeholder }: any) => (
  <div data-testid="content-search">
    <input placeholder={placeholder} />
    <button
      data-testid="select-mock-post"
      onClick={() =>
        onSelectItem({ 
          id: 123,
          title: 'Test',
          url: 'test',
          type: 'post',
          subtype: 'post'
        })
      }
    >
      Select Mock Post
    </button>
  </div>
);
