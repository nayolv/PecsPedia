const ReactTestRenderer = require('react-test-renderer');

module.exports = {
    render: (ui, container) => {
        // Use react-test-renderer to "render" the element
        const tree = ReactTestRenderer.create(ui);
        if (container) container._root = tree;
        return tree;
    },
    unmountComponentAtNode: (container) => {
        if (container && container._root && typeof container._root.unmount === 'function') {
            container._root.unmount();
        }
    },
    // Provide a minimal createPortal implementation
    createPortal: (node) => node,
};
