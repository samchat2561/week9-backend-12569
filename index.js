const express = require('express');
const app = express();

//Data mockup
const users = [
    { id: '101', name: "Somchai", role: "Admin" },
    { id: '102', name: "Somsri", role: "USer" },
]

app.get('/', (req, res) => {
    return res.send(`สวัสดียามเช้า`);
});

// 1. Dynamic Route :http://localhost:3000/users/101
app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    user ? res.status(200).json(user) : res.status(404).json({ error: "Not Found" })
});

// 2. Query Route (ลดรูปตัวแปรและใช้ Array Methods บรรทัดเดียว)
app.get('/search', (req, res) => {
    const { keyword = '', limit = 10 } = req.query;
    const result = users.filter(u => u.name.toLowerCase().includes(keyword.toLowerCase()));
    res.json(result.slice(0, Number(limit)));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});