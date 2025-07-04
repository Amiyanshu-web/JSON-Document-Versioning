// let diff = { "added": {}, "modified": {}, "removed": {} };

// function performDiff(oldObj, newObj, currentPath = "", depth = 0) {
//     //check size in mb of both objects
//     if (JSON.stringify(oldObj).length > process.env.MAX_SIZE_MB * 1024 * 1024 ||
//         JSON.stringify(newObj).length > process.env.MAX_SIZE_MB * 1024 * 1024) {
//         return "Objects are too large to compare";
//     }
//     // Depth limit handling
//     if (depth >= 10) {
//         diff["modified"][currentPath] = {
//             "old": oldObj,
//             "new": newObj,
//             "hasDeepChanges": true
//         };
//         return diff;
//     }

//     const oldKeys = new Set(Object.keys(oldObj));
//     const newKeys = new Set(Object.keys(newObj));
//     const allKeys = new Set([...oldKeys, ...newKeys]);

//     if (allKeys.size === process.env.MAX_PROPERTIES) {
//         return "Too many properties to compare";
//     }

//     for (const key of allKeys) {
//         const newPath = currentPath ? `${currentPath}.${key}` : key;

//         if (key in oldObj && key in newObj) {
//             // Both objects have this key
//             if (typeof (oldObj[key]) === "object" &&
//                 typeof (newObj[key]) === "object" &&
//                 !Array.isArray(oldObj[key]) &&
//                 !Array.isArray(newObj[key]) &&
//                 oldObj[key] !== null &&
//                 newObj[key] !== null) {
//                 // Recurse for plain objects only
//                 performDiff(oldObj[key], newObj[key], newPath, depth + 1);
//             }
//             else if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
//                 // Value changed
//                 diff["modified"][newPath] = { "old": oldObj[key], "new": newObj[key] };
//             }
//             // If values are identical, do nothing
//         }
//         else if (key in oldObj) {
//             // Key removed
//             diff["removed"][newPath] = oldObj[key];
//         }
//         else {
//             // Key added
//             diff["added"][newPath] = newObj[key];
//         }
//     }

//     return diff;
// }

// module.exports= performDiff;


// Move diff object inside the function instead of global scope
function performDiff(oldObj, newObj, currentPath = "", depth = 0) {
    // Create new diff object for each function call
    const diff = {
        "added": {},
        "modified": {},
        "removed": {}
    };

    //check size in mb of both objects
    if (JSON.stringify(oldObj).length > process.env.MAX_SIZE_MB * 1024 * 1024 ||
        JSON.stringify(newObj).length > process.env.MAX_SIZE_MB * 1024 * 1024) {
        return "Objects are too large to compare";
    }
    // Depth limit handling
    if (depth >= 10) {
        diff["modified"][currentPath] = {
            "old": oldObj,
            "new": newObj,
            "hasDeepChanges": true
        };
        return diff;
    }

    const oldKeys = new Set(Object.keys(oldObj));
    const newKeys = new Set(Object.keys(newObj));
    const allKeys = new Set([...oldKeys, ...newKeys]);

    if (allKeys.size === process.env.MAX_PROPERTIES) {
        return "Too many properties to compare";
    }

    for (const key of allKeys) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;

        if (key in oldObj && key in newObj) {
            // Both objects have this key
            if (typeof (oldObj[key]) === "object" &&
                typeof (newObj[key]) === "object" &&
                !Array.isArray(oldObj[key]) &&
                !Array.isArray(newObj[key]) &&
                oldObj[key] !== null &&
                newObj[key] !== null) {
                // Recurse for plain objects only
                const subDiff = performDiff(oldObj[key], newObj[key], newPath, depth + 1);
                // Merge the subdiff results into the current diff
                if (typeof subDiff === 'object') {
                    Object.keys(subDiff).forEach(type => {
                        Object.assign(diff[type], subDiff[type]);
                    });
                }
            }
            else if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
                // Value changed
                diff["modified"][newPath] = { "old": oldObj[key], "new": newObj[key] };
            }
            // If values are identical, do nothing
        }
        else if (key in oldObj) {
            // Key removed
            diff["removed"][newPath] = oldObj[key];
        }
        else {
            // Key added
            diff["added"][newPath] = newObj[key];
        }
    }

    return diff;
}

module.exports = performDiff;