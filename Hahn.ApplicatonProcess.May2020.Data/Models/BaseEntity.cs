using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Models
{
    public abstract class BaseEntity<TId>
    {
        public TId Id { get; protected set; }

        protected BaseEntity(TId id)
        {
            if (object.Equals(id, default(TId)))
            {
                throw new ArgumentException("The ID cannot be the type's default value.", "id");
            }
            Id = id;
        }

        protected BaseEntity() { }
    }
}
