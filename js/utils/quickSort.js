export function qsort(n, less, swap) {

    function partition(l, r) {
        for (let j = l; j < r; j++) {
            if (less(j, r)) {
                swap(j, l);
                l++;
            }
        }
        swap(l, r);
        return l;
    }

    function qsortRec(l, r) {
        if (l > r) return;
        let q = partition(l, r);
        qsortRec(l, q - 1);
        qsortRec(q + 1, r);
    }

    qsortRec(0, n - 1);
}

// Пример вызова:
/*

let a = [1, 4, 2, 3, 10, 3, 4, 3, 2, 1, 2, 33];

qsort(a.length,
    new Function('i, j', 'return a[i] < a[j]'),
    new Function('i, j', '[ a[i], a[j] ] = [ a[j], a[i] ]'));

*/
