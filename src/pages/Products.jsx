import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import {
    getProducts,
    searchProducts,
    getCategories,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../services/productService";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
    });

    const limit = 12;

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        let active = true;

        async function loadProducts() {
            try {
                setLoading(true);
                setError("");

                const skip = (page - 1) * limit;
                let data;

                if (category) {
                    data = await getProductsByCategory(category);
                } else if (search.trim()) {
                    data = await searchProducts(search.trim());
                } else {
                    data = await getProducts(limit, skip);
                }

                if (active) {
                    const items = data.products || [];

                    if (category || search.trim()) {
                        setTotal(items.length);
                        setProducts(
                            items.slice(skip, skip + limit)
                        );
                    } else {
                        setProducts(items);
                        setTotal(data.total);
                    }
                }
            } catch (err) {
                if (active) setError(err.message);
            } finally {
                if (active) setLoading(false);
            }
        }

        loadProducts();

        return () => {
            active = false;
        };
    }, [page, category, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(total / limit)
    );

    function handleSearch(event) {
        event.preventDefault();
        setPage(1);
    }

    function handleCategory(event) {
        setCategory(event.target.value);
        setSearch("");
        setPage(1);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function resetForm() {
        setForm({
            title: "",
            price: "",
            description: "",
        });

        setEditingId(null);
    }

    function handleEdit(product) {
        setEditingId(product.id);
        setForm({
            title: product.title,
            price: product.price,
            description: product.description || "",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setMessage("");

        try {
            const productData = {
                ...form,
                price: Number(form.price),
            };

            if (editingId !== null) {
                const updated = await updateProduct(
                    editingId,
                    productData
                );

                setProducts((previous) =>
                    previous.map((product) =>
                        product.id === editingId
                            ? { ...product, ...updated }
                            : product
                    )
                );

                setMessage("Producto actualizado correctamente.");
            } else {
                const created = await createProduct(productData);

                setProducts((previous) => [
                    { ...created, ...productData },
                    ...previous,
                ].slice(0, limit));

                setMessage("Producto creado correctamente.");
            }

            resetForm();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("¿Eliminar este producto?")) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await deleteProduct(id);

            setProducts((previous) =>
                previous.filter((product) => product.id !== id)
            );

            setMessage("Producto eliminado correctamente.");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <section className="products-page">
            <h1>Productos</h1>
            <p>Administración de productos mediante DummyJSON.</p>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <div className="filters">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>

                <select value={category} onChange={handleCategory}>
                    <option value="">Todas las categorías</option>

                    {categories.map((item) => {
                        const value =
                            typeof item === "string" ? item : item.slug;

                        const label =
                            typeof item === "string" ? item : item.name;

                        return (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <h2>
                    {editingId !== null
                        ? "Actualizar producto"
                        : "Agregar producto"}
                </h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Nombre del producto"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Descripción del producto"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                />

                <div className="actions">
                    <button type="submit">
                        {editingId !== null ? "Actualizar" : "Guardar"}
                    </button>

                    {editingId !== null && (
                        <button type="button" onClick={resetForm}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <>
                    <ProductList
                        products={products}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <div className="pagination">
                        <button
                            onClick={() =>
                                setPage((previous) => Math.max(1, previous - 1))
                            }
                            disabled={page === 1}
                        >
                            Anterior
                        </button>

                        <span>
                            Página {page} de {totalPages}
                        </span>

                        <button
                            onClick={() =>
                                setPage((previous) =>
                                    Math.min(totalPages, previous + 1)
                                )
                            }
                            disabled={page >= totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Products;