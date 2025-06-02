import { useState, useEffect } from 'react';

export default function List({
  onSearch,
}: {
  onSearch: (filters: { category: string[]; salary: string }) => void;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setSelectedCategories((prev) =>
      e.target.checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  // カテゴリ・年収どちらか変更されたら即時 onSearch を呼ぶ
  useEffect(() => {
    onSearch({ category: selectedCategories, salary });
  }, [selectedCategories, salary, onSearch]);

  return (
    <div className="space-y-6">
      {/* カテゴリ一覧（チェックボックス） */}
      <div>
        <p className="font-bold mb-2">求人カテゴリ</p>
        <div className="flex flex-col">
          {[
            '事務',
            'エンジニア',
            '営業',
            'デザイン',
            'マーケティング',
            '財務・経理',
            '人事',
            'カスタマーサポート',
            '製造',
            '医療・介護',
          ].map((category) => (
            <div key={category} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* 年収選択 */}
      <div>
        <p className="font-bold mb-2">年収（万円以上）</p>
        <select
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full py-2 px-4 border border-gray-300 text-lg rounded"
        >
          <option value="">指定なし</option>
          <option value="300">300万円以上</option>
          <option value="400">400万円以上</option>
          <option value="500">500万円以上</option>
          <option value="600">600万円以上</option>
          <option value="700">700万円以上</option>
          <option value="800">800万円以上</option>
          <option value="900">900万円以上</option>
          <option value="1000">1000万円以上</option>
        </select>
      </div>
    </div>
  );
}