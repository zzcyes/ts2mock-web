interface JsonViewerProps {
  jsonStr: string;
}

function JsonViewer({ jsonStr }: JsonViewerProps) {
  return (
    <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-auto h-full">
      <code>{jsonStr}</code>
    </pre>
  );
}

export default JsonViewer;
