export function LoadingOverlay() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000 // Đảm bảo nó nằm trên cùng của các element khác
        }}>
            <div style={{
                border: '8px solid #f3f3f3',
                borderRadius: '50%',
                borderTop: '8px solid #3498db',
                width: '60px',
                height: '60px',
                animation: 'spin 2s linear infinite'
            }} />
            <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        </div>
    );
}
