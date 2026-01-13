const BoardLayout = ({ heading, subheading, children, footer }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">{heading}</h2>
              <p className="text-sm text-gray-600 mt-1">{subheading}</p>
            </div>
            <div className="px-8 py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
      {footer && (
        <div className="border-t border-gray-200 bg-white px-8 py-4">
          <div className="max-w-7xl mx-auto flex justify-between">
            {footer}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardLayout;