
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Home, MapPin, Plus, Check, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Address {
  id: number;
  type: string;
  street: string;
  city: string;
  district: string;
  isDefault: boolean;
}

const AddressManagement = () => {
  // Sample addresses data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      city: "Kigali",
      district: "Nyarugenge",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Avenue",
      city: "Kigali",
      district: "Kicukiro",
      isDefault: false
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    type: "Home",
    street: "",
    city: "Kigali",
    district: ""
  });

  // Set an address as default
  const setAsDefault = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    
    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully.",
    });
  };

  // Open edit dialog with current address data
  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog for an address
  const openDeleteDialog = (address: Address) => {
    setCurrentAddress(address);
    setIsDeleteDialogOpen(true);
  };

  // Handle edit form input changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentAddress) {
      setCurrentAddress({
        ...currentAddress,
        [name]: value
      });
    }
  };

  // Handle new address form input changes
  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  // Save edited address
  const saveEditedAddress = () => {
    if (currentAddress) {
      setAddresses(addresses.map(address => 
        address.id === currentAddress.id ? currentAddress : address
      ));
      
      setIsEditDialogOpen(false);
      
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });
    }
  };

  // Add new address
  const addNewAddress = () => {
    const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
    const addressToAdd = {
      ...newAddress,
      id: newId,
      isDefault: addresses.length === 0 // Make default if it's the first address
    };
    
    setAddresses([...addresses, addressToAdd]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewAddress({
      type: "Home",
      street: "",
      city: "Kigali",
      district: ""
    });
    
    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    });
  };

  // Delete address
  const deleteAddress = () => {
    if (currentAddress) {
      // If deleting default address, make first remaining address the default
      let newAddresses = addresses.filter(address => address.id !== currentAddress.id);
      
      if (currentAddress.isDefault && newAddresses.length > 0) {
        newAddresses = newAddresses.map((address, index) => ({
          ...address,
          isDefault: index === 0
        }));
      }
      
      setAddresses(newAddresses);
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Address deleted",
        description: "The address has been removed from your account.",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <Link to="/dashboard" className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Manage Addresses</h1>
            <p className="text-gray-600">Add, edit, or remove delivery addresses</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Add a new delivery address to your account.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-type">Address Type</Label>
                  <Input 
                    id="new-type" 
                    name="type" 
                    value={newAddress.type} 
                    onChange={handleNewAddressChange}
                    placeholder="e.g., Home, Work, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-street">Street Address</Label>
                  <Input 
                    id="new-street" 
                    name="street" 
                    value={newAddress.street} 
                    onChange={handleNewAddressChange}
                    placeholder="Enter street address"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-city">City</Label>
                    <Input 
                      id="new-city" 
                      name="city" 
                      value={newAddress.city} 
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-district">District</Label>
                    <Input 
                      id="new-district" 
                      name="district" 
                      value={newAddress.district} 
                      onChange={handleNewAddressChange}
                      placeholder="Enter district"
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={addNewAddress}>Add Address</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <Card key={address.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Home className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">{address.type}</h3>
                        {address.isDefault && (
                          <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.district}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      {!address.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center"
                          onClick={() => setAsDefault(address.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Set as Default
                        </Button>
                      )}
                      
                      <Dialog open={isEditDialogOpen && currentAddress?.id === address.id} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center"
                            onClick={() => openEditDialog(address)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Address</DialogTitle>
                            <DialogDescription>
                              Update your delivery address details.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {currentAddress && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-type">Address Type</Label>
                                <Input 
                                  id="edit-type" 
                                  name="type" 
                                  value={currentAddress.type} 
                                  onChange={handleEditChange}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-street">Street Address</Label>
                                <Input 
                                  id="edit-street" 
                                  name="street" 
                                  value={currentAddress.street} 
                                  onChange={handleEditChange}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-city">City</Label>
                                  <Input 
                                    id="edit-city" 
                                    name="city" 
                                    value={currentAddress.city} 
                                    onChange={handleEditChange}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="edit-district">District</Label>
                                  <Input 
                                    id="edit-district" 
                                    name="district" 
                                    value={currentAddress.district} 
                                    onChange={handleEditChange}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                            <Button onClick={saveEditedAddress}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={isDeleteDialogOpen && currentAddress?.id === address.id} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => openDeleteDialog(address)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Address</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this address? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={deleteAddress}>Delete Address</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Addresses Found</CardTitle>
              <CardDescription>You haven't added any delivery addresses yet.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MapPin className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4 text-center">
                Add your first address to make checkout faster and easier.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AddressManagement;
