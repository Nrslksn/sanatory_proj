export default function QueueTable() {
    const data = [
      { id: 1, city: "Караганда", name: "Ахметов Азамат", iin: "852963741258", period: "Апрель", address: "ул. Сатпаева, 5", contact: "+7 777 999 99 99" },
      { id: 2, city: "Караганда", name: "Ахметов Азамат", iin: "852963741258", period: "Апрель", address: "ул. Сатпаева, 5", contact: "+7 777 999 99 99" },
      { id: 3, city: "Караганда", name: "Ахметов Азамат", iin: "852963741258", period: "Апрель", address: "ул. Сатпаева, 5", contact: "+7 777 999 99 99" },
      ...Array(20).fill({ id: 1, city: "", name: "", iin: "", period: "", address: "", contact: "" }),
    ];
  
    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 px-6">Очерёдность</h2>
  
        <div className="max-w-5xl mx-auto p-6 rounded-xl">
          {/* Контейнер с фиксированной высотой и прокруткой */}
          <div className="max-h-96 overflow-y-auto border rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-green-900 text-white sticky top-0">
                <tr>
                  <th className="p-3 text-left">№</th>
                  <th className="p-3 text-left">Город/район</th>
                  <th className="p-3 text-left">ФИО</th>
                  <th className="p-3 text-left">ИИН</th>
                  <th className="p-3 text-left">Период</th>
                  <th className="p-3 text-left">Адрес</th>
                  <th className="p-3 text-left">Контакты</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{row.id}</td>
                    <td className="p-3 text-green-700">{row.city}</td>
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.iin}</td>
                    <td className="p-3 text-green-700">{row.period}</td>
                    <td className="p-3">{row.address}</td>
                    <td className="p-3">{row.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  