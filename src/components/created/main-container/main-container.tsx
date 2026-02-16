
function MainContainer( {children}: {children: React.ReactNode}) {
  return (
    <div className="mx-auto max-w-7xl flex flex-col items-center justify-between p-4 sm:px-6 sm:py-4 gap-4">
      {children}
    </div>
  );
}

function ContainerDiv( {children}: {children: React.ReactNode}) {
  return (
    <div className="w-full flex gap-4 flex-col sm:flex-row flex-wrap justify-between">
      {children}
    </div>
  );
}

export { MainContainer, ContainerDiv };