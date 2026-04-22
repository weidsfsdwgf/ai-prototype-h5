import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./styles.css";

const currentUserRole = "admin";

const initialItems = [
  {
    id: "XE-001",
    code: "XE-001",
    name: "A4 复印纸 70g",
    spec: "5 包 / 箱",
    unit: "箱",
    category: "办公耗材",
    area: "成都拉森",
    owner: "周雅楠",
    stock: 24,
    safetyMin: 30,
  },
  {
    id: "XE-002",
    code: "XE-002",
    name: "一次性口罩",
    spec: "50 只 / 盒",
    unit: "盒",
    category: "劳保用品",
    area: "广州拉森",
    owner: "陈思宇",
    stock: 186,
    safetyMin: 80,
  },
  {
    id: "XE-003",
    code: "XE-003",
    name: "无线鼠标",
    spec: "罗技 M185",
    unit: "个",
    category: "IT 配件",
    area: "成都拉森",
    owner: "沈鸿",
    stock: 9,
    safetyMin: 12,
  },
  {
    id: "XE-004",
    code: "XE-004",
    name: "地推海报支架",
    spec: "80cm x 180cm",
    unit: "套",
    category: "门店物料",
    area: "厦门岛内",
    owner: "姜珊",
    stock: 32,
    safetyMin: 10,
  },
  {
    id: "XE-005",
    code: "XE-005",
    name: "84 消毒液",
    spec: "5L / 桶",
    unit: "桶",
    category: "清洁用品",
    area: "广州拉森",
    owner: "周雅楠",
    stock: 6,
    safetyMin: 8,
  },
];

const initialDispatches = [
  { id: "LY-20260415-018", itemId: "XE-001", itemName: "A4 复印纸 70g", type: "领用", employee: "刘倩", department: "行政部", qty: 4, area: "成都拉森", owner: "周雅楠", note: "月度办公补给", status: "待确认分发" },
  { id: "LY-20260415-023", itemId: "XE-002", itemName: "一次性口罩", type: "领用", employee: "王超", department: "仓储部", qty: 12, area: "广州拉森", owner: "陈思宇", note: "夜班补给", status: "待确认分发" },
  { id: "LY-20260415-011", itemId: "XE-003", itemName: "无线鼠标", type: "领用", employee: "赵一鸣", department: "信息部", qty: 3, area: "成都拉森", owner: "沈鸿", note: "新人入职工位配置", status: "待确认分发" },
  { id: "LY-20260415-029", itemId: "XE-004", itemName: "地推海报支架", type: "领用", employee: "范敏", department: "门店事业部", qty: 6, area: "厦门岛内", owner: "姜珊", note: "新品地推布展", status: "待确认分发" },
];

const initialReturns = [
  { id: "JY-20260412-006", itemId: "XE-001", itemName: "A4 复印纸 70g", employee: "孟洁", department: "品牌部", qty: 2, area: "成都拉森", owner: "周雅楠", date: "2026-04-12 16:20", status: "待归还" },
  { id: "JY-20260411-003", itemId: "XE-003", itemName: "无线鼠标", employee: "韩雪", department: "运营中心", qty: 1, area: "成都拉森", owner: "沈鸿", date: "2026-04-11 14:35", status: "待归还" },
  { id: "JY-20260414-010", itemId: "XE-004", itemName: "地推海报支架", employee: "常乐", department: "门店事业部", qty: 6, area: "厦门岛内", owner: "姜珊", date: "2026-04-14 17:42", status: "待归还" },
];

function PhoneFrame({ children }) {
  return (
    <div className="app-shell">
      <main className="phone">{children}</main>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="home-page">
        <section className="workspace-banner">
          <span>Mobile Prototype</span>
          <h1>移动端原型工作台</h1>
        </section>

        <section className="app-section">
          <h2>资产</h2>
          <button className="app-icon-card" type="button" onClick={() => navigate("/consumables")}>
            <span className="app-icon">耗</span>
            <span className="app-label">
              <strong>易耗品申领</strong>
              <small>申领 / 分发 / 归还</small>
            </span>
          </button>
        </section>
      </div>
    </PhoneFrame>
  );
}

function AppHeader({ onBack }) {
  return (
    <header className="app-header">
      <button className="back-button" type="button" onClick={onBack} aria-label="返回工作台">
        ‹
      </button>
      <div>
        <span>资产</span>
        <h1>易耗品申领</h1>
      </div>
      <strong className="role-badge">行政</strong>
    </header>
  );
}

function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="modal-mask" role="presentation">
      <section className="modal-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-handle" />
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <button type="button" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ClaimModal({ item, onClose, onSubmit }) {
  const [form, setForm] = React.useState({
    employee: "刘倩",
    department: "行政部",
    type: "领用",
    qty: "1",
    note: "",
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const qty = Number(form.qty);
    if (!qty || qty <= 0) return;
    onSubmit({
      itemId: item.id,
      itemName: item.name,
      employee: form.employee || "未填写",
      department: form.department || "未填写",
      type: form.type,
      qty,
      area: item.area,
      owner: item.owner,
      note: form.note || `申领 ${item.name}`,
    });
  };

  return (
    <Modal title="填写申领信息" subtitle={`${item.name} · 当前库存 ${item.stock}${item.unit}`} onClose={onClose}>
      <form className="modal-form" onSubmit={submit}>
        <div className="form-grid">
          <Field label="申领人">
            <input value={form.employee} onChange={(event) => update("employee", event.target.value)} />
          </Field>
          <Field label="所属部门">
            <input value={form.department} onChange={(event) => update("department", event.target.value)} />
          </Field>
        </div>
        <div className="segmented">
          {["领用", "借用"].map((type) => (
            <button className={form.type === type ? "active" : ""} type="button" key={type} onClick={() => update("type", type)}>
              {type}
            </button>
          ))}
        </div>
        <Field label="申领数量">
          <input inputMode="numeric" value={form.qty} onChange={(event) => update("qty", event.target.value)} />
        </Field>
        <Field label="用途说明">
          <textarea value={form.note} onChange={(event) => update("note", event.target.value)} placeholder="例如：月度办公补给、新人入职配置" />
        </Field>
        <button className="primary-button" type="submit">提交</button>
      </form>
    </Modal>
  );
}

function ClaimPage({ items, onSubmit }) {
  const [keyword, setKeyword] = React.useState("");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [category, setCategory] = React.useState("全部分类");
  const [area, setArea] = React.useState("全部区域");
  const [claimItem, setClaimItem] = React.useState(null);
  const categories = React.useMemo(() => ["全部分类", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const areas = React.useMemo(() => ["全部区域", ...Array.from(new Set(items.map((item) => item.area)))], [items]);
  const filtered = items.filter((item) => {
    const text = keyword.trim();
    const matchesKeyword = !text || `${item.name}${item.code}`.includes(text);
    const matchesCategory = category === "全部分类" || item.category === category;
    const matchesArea = area === "全部区域" || item.area === area;
    return matchesKeyword && matchesCategory && matchesArea;
  });

  const submitClaim = (payload) => {
    onSubmit(payload);
    setClaimItem(null);
  };

  return (
    <div className="tab-page">
      <section className="search-panel">
        <label>
          <span>搜索物品</span>
          <div className="search-row">
            <div className="search-input">
              <b>⌕</b>
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="输入名称或编号" />
            </div>
            <button className={filtersOpen ? "filter-button active" : "filter-button"} type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="展开筛选">
              ⌯
            </button>
          </div>
        </label>
        {filtersOpen ? (
          <div className="filter-panel">
            <label>
              <span>分类</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              <span>区域</span>
              <select value={area} onChange={(event) => setArea(event.target.value)}>
                {areas.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        ) : null}
      </section>

      <section className="item-list">
        {filtered.map((item) => (
          <button className="item-card" type="button" key={item.id} onClick={() => setClaimItem(item)}>
            <div className="item-main">
              <div className="item-title-row">
                <span className="tag">{item.category}</span>
                <span className="code-tag">{item.code}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.spec}</p>
              <small>{item.area} · {item.owner}</small>
            </div>
            <div className={item.stock < item.safetyMin ? "stock warning" : "stock"}>
              <strong>{item.stock}</strong>
              <small>{item.unit}</small>
            </div>
            <span className="card-chevron">›</span>
          </button>
        ))}
      </section>

      {claimItem ? <ClaimModal item={claimItem} onClose={() => setClaimItem(null)} onSubmit={submitClaim} /> : null}
    </div>
  );
}

function ActionModal({ action, record, onClose, onSubmit }) {
  const [qty, setQty] = React.useState(String(record.qty));
  const [lossQty, setLossQty] = React.useState("0");
  const [lossNote, setLossNote] = React.useState("");
  const isDispatch = action === "dispatch";

  const submit = (event) => {
    event.preventDefault();
    const actualQty = Number(qty);
    if (!actualQty || actualQty <= 0 || actualQty > record.qty) return;
    const actualLossQty = Number(lossQty);
    if (!isDispatch && (Number.isNaN(actualLossQty) || actualLossQty < 0 || actualLossQty > record.qty)) return;
    onSubmit(record, isDispatch ? { qty: actualQty } : { qty: actualQty, lossQty: actualLossQty, lossNote: lossNote || "无损耗" });
  };

  return (
    <Modal title={isDispatch ? "确认分发" : "确认归还"} subtitle={`${record.itemName} · 申请数量 ${record.qty}`} onClose={onClose}>
      <form className="modal-form" onSubmit={submit}>
        <div className="record-summary">
          <span>{record.id}</span>
          <strong>{record.employee} · {record.department}</strong>
          <p>{record.area} · {record.owner}</p>
        </div>
        <Field label={isDispatch ? "本次分发数量" : "本次归还数量"}>
          <input inputMode="numeric" value={qty} onChange={(event) => setQty(event.target.value)} />
        </Field>
        {!isDispatch ? (
          <>
            <Field label="损耗数量">
              <input inputMode="numeric" value={lossQty} onChange={(event) => setLossQty(event.target.value)} />
            </Field>
            <Field label="损耗说明">
              <textarea value={lossNote} onChange={(event) => setLossNote(event.target.value)} placeholder="例如：外包装破损 1 件，其余完好入库" />
            </Field>
          </>
        ) : null}
        <button className="primary-button" type="submit">{isDispatch ? "确认分发" : "确认归还"}</button>
      </form>
    </Modal>
  );
}

function RecordCard({ record, type, isAdmin, onAction }) {
  const isDispatch = type === "dispatch";

  return (
    <article className="record-card">
      <div className="record-top">
        <div>
          <h3>{record.itemName}</h3>
        </div>
        <strong>{record.qty}</strong>
      </div>
      <div className="record-meta">
        <span><b>单号</b>{record.id}</span>
        <span><b>人员</b>{record.employee} · {record.department}</span>
        <span><b>区域</b>{record.area} · {record.owner}</span>
        <span><b>{isDispatch ? "用途" : "时间"}</b>{isDispatch ? record.note : record.date}</span>
      </div>
      {isAdmin ? (
        <button className={isDispatch ? "action-button" : "action-button green"} type="button" onClick={() => onAction(record)}>
          {isDispatch ? "确认分发" : "确认归还"}
        </button>
      ) : null}
    </article>
  );
}

function RecordsPage({ dispatches, returns, isAdmin, onDispatch, onReturn }) {
  const [recordTab, setRecordTab] = React.useState("dispatch");
  const [actionState, setActionState] = React.useState(null);
  const currentList = recordTab === "dispatch" ? dispatches : returns;

  const submitAction = (record, values) => {
    if (actionState?.type === "dispatch") {
      onDispatch(record, values);
    } else {
      onReturn(record, values);
    }
    setActionState(null);
  };

  return (
    <div className="tab-page">
      <section className="record-switch">
        <button className={recordTab === "dispatch" ? "active" : ""} type="button" onClick={() => setRecordTab("dispatch")}>
          <span>待分发</span><b>{dispatches.length}</b>
        </button>
        <button className={recordTab === "return" ? "active" : ""} type="button" onClick={() => setRecordTab("return")}>
          <span>待归还</span><b>{returns.length}</b>
        </button>
      </section>

      <section className="record-list">
        {currentList.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            type={recordTab}
            isAdmin={isAdmin}
            onAction={(item) => setActionState({ type: recordTab, record: item })}
          />
        ))}
        {!currentList.length ? <div className="empty-state">当前没有待处理记录</div> : null}
      </section>

      {actionState ? (
        <ActionModal
          action={actionState.type}
          record={actionState.record}
          onClose={() => setActionState(null)}
          onSubmit={submitAction}
        />
      ) : null}
    </div>
  );
}

function ConsumablesApp() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("claim");
  const [items, setItems] = React.useState(initialItems);
  const [dispatches, setDispatches] = React.useState(initialDispatches);
  const [returns, setReturns] = React.useState(initialReturns);
  const [completed, setCompleted] = React.useState([]);
  const isAdmin = currentUserRole === "admin";

  const submitClaim = (payload) => {
    const id = `LY-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(dispatches.length + completed.length + 31).padStart(3, "0")}`;
    setDispatches((prev) => [{ ...payload, id, status: "待确认分发" }, ...prev]);
  };

  const confirmDispatch = (record, values) => {
    setDispatches((prev) => prev.filter((item) => item.id !== record.id));
    setItems((prev) =>
      prev.map((item) => (item.id === record.itemId ? { ...item, stock: Math.max(0, item.stock - values.qty) } : item))
    );
    if (record.type === "借用") {
      setReturns((prev) => [{ ...record, id: record.id.replace("LY", "JY"), qty: values.qty, date: "刚刚", status: "待归还" }, ...prev]);
    }
    setCompleted((prev) => [{ ...record, ...values, doneId: `${record.id}-dispatch`, label: "已分发" }, ...prev]);
  };

  const confirmReturn = (record, values) => {
    setReturns((prev) => prev.filter((item) => item.id !== record.id));
    setItems((prev) =>
      prev.map((item) => (item.id === record.itemId ? { ...item, stock: item.stock + values.qty } : item))
    );
    setCompleted((prev) => [{ ...record, ...values, doneId: `${record.id}-return`, label: "已归还" }, ...prev]);
  };

  return (
    <PhoneFrame>
      <AppHeader onBack={() => navigate("/home")} />
      <div className="app-content">
        {activeTab === "claim" ? <ClaimPage items={items} onSubmit={submitClaim} /> : null}
        {activeTab === "records" ? (
          <RecordsPage
            dispatches={dispatches}
            returns={returns}
            isAdmin={isAdmin}
            onDispatch={confirmDispatch}
            onReturn={confirmReturn}
          />
        ) : null}
      </div>
      <nav className="bottom-tabs" aria-label="易耗品申领菜单">
        <button className={activeTab === "claim" ? "active" : ""} type="button" onClick={() => setActiveTab("claim")}>
          <span>＋</span>
          申领
        </button>
        <button className={activeTab === "records" ? "active" : ""} type="button" onClick={() => setActiveTab("records")}>
          <span>☑</span>
          记录
        </button>
      </nav>
    </PhoneFrame>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/consumables" element={<ConsumablesApp />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
